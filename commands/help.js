const settings = require('../settings');
const fs = require('fs');
const path = require('path');

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds = seconds % (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds = seconds % (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

async function helpCommand(sock, chatId, message) {
    const start = Date.now();
    await sock.sendMessage(chatId, { text: '_🔄 Loading IMRAN-BOT menu..._' }, { quoted: message });
    const end = Date.now();
    const ping = Math.round((end - start) / 2);
    const uptimeFormatted = formatTime(process.uptime());

    const helpMessage = `
┏━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🤖 *IMRAN-BOT COMMAND MENU* 🤖
┗━━━━━━━━━━━━━━━━━━━━━━┛

📍 *Owner:* ${settings.botOwner}
⏳ *Uptime:* ${uptimeFormatted}
🕐 *Time:* ${new Date().toLocaleString()}
⚡ *Speed:* ${ping}ms
🛠️ *Version:* ${settings.version}

━━━━━━━━━━━━━━━━━━━━━━
📂 *Owner Commands*
━━━━━━━━━━━━━━━━━━━━━━
🔒 .ban | .unban | .promote | .demote
🔕 .mute | .unmute | .delete | .kick
⚠️ .warnings | .warn | .antilink | .antibadword
🧹 .clear | .tag | .tagall | .chatbot
🔗 .resetlink | .welcome | .goodbye

━━━━━━━━━━━━━━━━━━━━━━
🌐 *General Commands*
━━━━━━━━━━━━━━━━━━━━━━
📜 .menu | 📶 .ping | ⏱️ .runtime | 🔊 .tts
👑 .owner | 😂 .joke | 💬 .quote | 🧠 .fact
🌦️ .weather | 📰 .news | 💌 .attp | 🎵 .lyrics
🎱 .8ball | ℹ️ .groupinfo | 👮 .admins | 🔍 .jid
📸 .ss | 🌍 .trt | 📞 .vv

━━━━━━━━━━━━━━━━━━━━━━
⚙️ *Settings Commands*
━━━━━━━━━━━━━━━━━━━━━━
🌐 .public | 🔐 .private | 🟢 .autostatus
📖 .autoread | 🧹 .clearsession | 🛡️ .antidelete
🧼 .cleartmp | 💬 .autoreact | 🖼️ .getpp | 📸 .setpp
📜 .autobio | ⌨️ .autotyping | 🎙️ .autorecording

━━━━━━━━━━━━━━━━━━━━━━
🎨 *Sticker Commands*
━━━━━━━━━━━━━━━━━━━━━━
🌀 .blur | 🖼️ .simage | 🌟 .sticker | 🐯 .tgsticker
🤣 .meme | 🎯 .take | 🔀 .emojimix

━━━━━━━━━━━━━━━━━━━━━━
🎮 *Game Commands*
━━━━━━━━━━━━━━━━━━━━━━
❌⭕ .tictactoe | 🎯 .hangman | ❓ .guess
🧠 .trivia | ✍️ .answer | 🤐 .truth | 😈 .dare

━━━━━━━━━━━━━━━━━━━━━━
🧠 *AI & Search*
━━━━━━━━━━━━━━━━━━━━━━
🤖 .gpt | 💡 .gptgo | 🧬 .gemini | 🧠 .flux
🎨 .imagine

━━━━━━━━━━━━━━━━━━━━━━
🎭 *Fun Commands*
━━━━━━━━━━━━━━━━━━━━━━
💘 .compliment | 😡 .insult | 😍 .flirt
📜 .shayari | 🌙 .goodnight | 🌹 .roseday
🎭 .character | ☠️ .wasted | 🚢 .ship
😈 .simp | 🤪 .stupid

━━━━━━━━━━━━━━━━━━━━━━
🧰 *Maker Menu*
━━━━━━━━━━━━━━━━━━━━━━
🔥 .fire | ⚡ .thunder | ❄️ .ice | 🌫️ .snow
👹 .devil | 💜 .purple | 💡 .light | 💻 .matrix
🎬 .arena | 👾 .hacker | 🌿 .leaves | 💥 .glitch
🌌 .metallic | 🖤 .blackpink | ✨ .neon | 🚫 .1917
🎭 .impressive | 🏖️ .sand

━━━━━━━━━━━━━━━━━━━━━━
🔍 *Search & Download*
━━━━━━━━━━━━━━━━━━━━━━
🎵 .play | 🎶 .song | 🎥 .video
📸 .instagram | 📘 .facebook | 🎵 .tiktok | 🔽 .ytmp4

━━━━━━━━━━━━━━━━━━━━━━
💻 *GitHub Commands*
━━━━━━━━━━━━━━━━━━━━━━
🔗 .git | 🧑‍💻 .github | 📦 .sc | 📂 .script
📁 .repo | 🌀 .gitclone
`;

    try {
        const imagePath = path.join(__dirname, '../assets/june_repo.jpg');

        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);

            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '@newsletter',
                        newsletterName: '',
                        serverMessageId: -1
                    }
                }
            }, { quoted: message });
        } else {
            console.error('Bot image not found at:', imagePath);
            await sock.sendMessage(chatId, {
                text: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '@newsletter',
                        newsletterName: '𝐈𝐌𝐑𝐀𝐍 𝐁𝐎𝐓',
                        serverMessageId: -1
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
