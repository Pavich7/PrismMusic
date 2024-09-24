# PrismMusic
PrismMusic public source code under MadeByPavich Source Code License.
### Latest deployed version: 24.5
Deployed: May 29, 2024 \
Shutdown: September 24, 2024
## About PrismMusic
PrismMusic is a Discord music bot developed by Pavich Komansil in 2019. It originated as a fork of [EvoBot](https://github.com/eritislami/evobot) and was initially closed-source. In September 2024, I decided to make it open-source for public learning and to enhance my portfolio. The decision to discontinue active maintenance was driven by my increasing responsibilities and limited time to dedicate to the project as I grow older. I hope that the open-source release will inspire collaboration and innovation within the community.
## Make it work
First, let's clone and install project dependencies.
```sh
git clone https://github.com/Pavich7/PrismMusic.git
cd PrismMusic
npm install
```
To configure bot token, in config.json file replace "TOKEN_GOES_HERE" with your bot token.
```json
{
  "TOKEN": "TOKEN_GOES_HERE",
  "MAX_PLAYLIST_SIZE": 10,
  "PRUNING": false,
  "LOCALE": "en",
  "DEFAULT_VOLUME": 100,
  "STAY_TIME": 30
}
```
After installation finished and configured, run `npm run start` to start the bot.
### MadeByPavich, A Pavich Komansil Project
© 2019-2024 Pavich Komansil. All rights reserved. All code, MadeByPavich logos, PrismMusic logos, and all assets associated with this project are the property and copyright of Pavich Komansil.

