import { readFileSync } from 'fs';
import marked from 'marked';
import { ParsedRequest } from './types';

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const barlow = readFileSync(`${__dirname}/../_fonts/Barlow-Bold.woff2`).toString('base64');
const barlowbold = readFileSync(`${__dirname}/../_fonts/Barlow-Black.woff2`).toString('base64');

export function getHtml(parsedReq: ParsedRequest) {
    const { text, subText, category, summary, score, image } = parsedReq;
    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }
    @font-face {
        font-family: 'Barlow';
        font-style: normal;
        font-weight: 700;
        src: url(data:font/woff2;charset=utf-8;base64,${barlow})  format("woff2");
      }
      @font-face {
          font-family: 'Barlow';
          font-style: normal;
          font-weight: 900;
          src: url(data:font/woff2;charset=utf-8;base64,${barlowbold})  format("woff2");
        }

    html {
        font-size: 32px;
        font-family: 'Barlow', sans-serif;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background:rgb(37, 99, 235);
        height: 100vh;
        width: 100vw;
    }

    body {
        position: relative;
        width: 1000px;
        height: 1000px;
    }

    .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2), transparent 70%);
    }

    .featured {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .text {
        z-index: 999;
        position: absolute;
        bottom: 0;
        left: 0;
        max-width: 100%;
        padding: 1rem 1.5rem;
    }

    .header {
        position: absolute;
        top: 1.5rem;
        left: 1.5rem;
        z-index: 999;
    }

    .logo {
        display: flex;
        align-items: center;
        justify-items: center;
        background: white;
        border-radius: 999px;
        width: 3rem;
        height: 3rem;
    }

    .cate {
        font-family: 'Inter', sans-serif;
        color: white;
        font-size: 0.8rem;
        letter-spacing: 0.25rem;
        text-transform: uppercase;
        font-weight: 700;
    }

    .vg {
        height: 1.4rem;
        margin: auto;
    }

    h2 {
        margin: unset;
        margin-top: .5rem;
        color: white;
        font-size: 2rem;
        font-weight: 700;
    }

    h3 {
        margin: unset;
        color: white;
        font-size: 1.2rem;
        margin-top: .2rem;
    }

    .score {
        flex-shrink: 0;
        margin-left: 1rem;
        width: 20vw;
        height: 20vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to right top, rgb(37, 99, 235), rgb(147, 197, 253));
        border-radius: 999px;
    }

    .score_number {
        font-weight: 900;
        font-size: 3.4rem;
        color: white;
    }

    .container {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
    }

    .summary {
        color: white;
        font-family: 'Inter', sans-serif;
    }
    
    .summary p {
        line-height: 1.5;
        margin: unset;
    }
    </style>
    </head>
    <body style="margin:0; padding:0">
    <div class="overlay"></div>
    <div class="header">
        <div class="logo">
            <img class="vg"
                src="https://vietgame.asia/wp-content/themes/deploy/public/images/vietgame-short.png?id=e5ecd15da2b22678c1bc" />
        </div>
    </div>
    <img class="featured"
        src="${image}" />
    <div class="text">
        <span class="cate">${category}</span>
        <h2>${text}</h2>
        ${getSubText(subText)}
        <div class="container">
            <div class="summary">
                <p>
                    ${marked(summary)}
                </p>
            </div>
            ${getScore(score)}
        </div>
    </div>
</body>
</html>`;
}

function getScore(score: string) {
    if (score !== '') {
        return `
        <div class="score">
            <span class="score_number">${score}</span>
        </div>
        `;
    } else return '';
}

function getSubText(text: string) {
    if (text !== '') {
        return `<h3>${text}</h3>`;
    } else return '';
}
