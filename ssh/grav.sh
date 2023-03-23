Comando Utilizados:
apt install linux-image-extra-virtual

echo “snd-aloop”>>/etc/modules

modprobe snd-aloop

lsmod | grep snd_aloop

sudo add-apt-repository ppa:mc3man/trusty-media

sudo apt-get update

sudo apt-get install ffmpeg

Instalando FFMPEG no Linux

sudo apt-get install ffmpeg

Instalando Google Chrome & Chromedriver
curl -sS -o – https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add

echo “deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main” > /etc/apt/sources.list.d/google-chrome.list

apt-get -y update

apt-get -y install google-chrome-stable

mkdir -p /etc/opt/chrome/policies/managed
echo ‘{ “CommandLineFlagSecurityWarningsEnabled”: false }’ >>/etc/opt/chrome/policies/managed/managed_policies.json

Instalando o Unzip

sudo apt install unzip

Instalando o Chrome Drive
CHROME_DRIVER_VERSION=curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE
wget -N http://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip -P ~/
unzip ~/chromedriver_linux64.zip -d ~/
rm ~/chromedriver_linux64.zip
sudo mv -f ~/chromedriver /usr/local/bin/chromedriver
sudo chown root:root /usr/local/bin/chromedriver
sudo chmod 0755 /usr/local/bin/chromedriver

Miscellaneous
sudo apt-get install default-jre-headless ffmpeg curl alsa-utils icewm xdotool xserver-xorg-input-void xserver-xorg-video-dummy

Adicionando Repositório
wget -qO – https://download.jitsi.org/jitsi-key.gpg.key | sudo apt-key add –

sudo sh -c “echo ‘deb https://download.jitsi.org stable/’ > /etc/apt/sources.list.d/jitsi-stable.list”

sudo apt-get update

Instalando Jibri

sudo apt-get install jibri

sudo usermod -aG adm,audio,video,plugdev jibri