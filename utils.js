const { readFileSync, writeFileSync, existsSync, unlink } = require('fs');
const { exec } = require('child_process');

const download_command = "curl -s https://api.github.com/repos/Frederikam/Lavalink/releases/latest | grep browser_download_url | cut -d '\"' -f 4 | wget -qi -";

module.exports = {
    download: () => {
        if (existsSync('./Lavalink.jar')) {
            unlink('./Lavalink.jar', (error) => {
                if (error) throw new Error(error.message);
                console.log('> Lavalink.jar deleted... Downloading the new version.');
            });
        }

        exec(download_command);
    },
    configure: () => {
        var application_yml = readFileSync('./application.yml', 'utf-8');

        if (process.env.PORT) application_yml = application_yml.replace('DYNAMICPORT', process.env.PORT);
        if (process.env.PASSWORD) application_yml = application_yml.replace('youshallnotpass', process.env.PASSWORD);

        writeFileSync('./application.yml', application_yml);
    }
};
