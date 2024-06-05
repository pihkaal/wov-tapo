#!/usr/bin/sh

# Install bin

pushd ~/.cache

echo "> Install"

if [ ! -d "tapo-rest" ]; then
  git clone https://github.com/ClementNerma/tapo-rest
fi

cd ./tapo-rest
git pull

cargo build --release
sudo cp ./target/release/tapo-rest /usr/local/bin/

popd


# Configure

echo "> Configure"

config_path="$HOME/.config/tapo-rest/config.json"

if [ ! -f "$config_path" ]; then
  mkdir -p ~/.config/tapo-rest

  echo "Tapo username: "
  read tapo_username

  echo "Tapo password: "
  read tapo_password

  echo "Device name: "
  read device_name

  echo "Device type: "
  read device_type

  echo "Device IP: "
  read device_ip

  config_template=$(cat ./config.json.template)
  config_template="${config_template/TAPO_USERNAME/${tapo_username}}"
  config_template="${config_template/TAPO_PASSWORD/${tapo_password}}"
  config_template="${config_template/DEVICE_NAME/${device_name}}"
  config_template="${config_template/DEVICE_TYPE/${device_type}}"
  config_template="${config_template/DEVICE_IP/${device_ip}}"

  echo "$config_template" > $config_path 
fi

# Setup deamon

echo "> Service setup"

auth_password=$(openssl rand -base64 32)

service_template=$(cat ./tapo_rest.service.template)
service_template="${service_template/CONFIG_PATH/${config_path}}"
service_template="${service_template/AUTH_PASSWORD/${auth_password}}"

echo "$service_template" | sudo tee /etc/systemd/system/tapo_rest.service > /dev/null

sudo systemctl daemon-reload
sudo systemctl enable tapo_rest.service
sudo systemctl start tapo_rest.service

echo "> Done"

echo "PORT: 6670"
echo "PASSWORD: $auth_password"
