# Hosting

The frontend is currently hosted on a VM located at `compsci308@vcm-307.vm.duke.edu`. For credentials please contact Zachary Marion or Professor Duvall. The repository is located in the home directory and is called `sonarqube-web-frontend`. To release a version to production, follow these steps:

```bash
cd ~/sonarqube-web-frontend
git pull
npm install
npm run build
sudo cp -r build/* /var/www/html/
```

This will build a production version of the repo and put it in a location where the Apache server can read it.