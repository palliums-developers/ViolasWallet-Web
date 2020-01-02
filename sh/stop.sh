sudo netstat -ntlp | grep 10086 | awk '{print $7}' | awk -F '/' '{print $1}' | xargs kill
sudo netstat -ntlp | grep 10088 | awk '{print $7}' | awk -F '/' '{print $1}' | xargs kill
sudo netstat -ntlp | grep 10086
sudo netstat -ntlp | grep 10088