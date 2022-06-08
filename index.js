#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const neonTitle = chalkAnimation.neon('Welcome To The Terminal Quiz \n');

    await sleep();
    neonTitle.stop();

    console.log(`
    ${chalk.bgCyan('HOW TO PLAY')}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('KILLED!')}
    So please get all the answers right....
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Javascript was created in 10 days and released on?\n',
        choices: [
            '23rd May 1995',
            '24th November 1995',
            '4th December 1995',
            '17th December 1996',
        ],
    });

    return handleAnswer(answers.question_1 == '4th December 1995');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Python was released on?\n',
        choices: [
            '23rd January 1991',
            '20th February 1991',
            '5th December 1992',
            '10th December 1990',
        ],
    });

    return handleAnswer(answers.question_2 == '20th February 1991');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'Node.js was released on?\n',
        choices: [
            '23rd March 2009',
            '20th September 2009',
            '15th August 2010',
            '27th May 2009',
        ],
    });

    return handleAnswer(answers.question_3 == '27th May 2009');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'What does HTML stand for?\n',
        choices: [
            'HyperText Markup Language',
            'HyperTechnical Markup Language',
            'HyperText Markdown Language',
            'HyperText Markup Linter',
        ],
    });

    return handleAnswer(answers.question_4 == 'HyperText Markup Language');
}

async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'Node.js is single threaded but it supports concurrency?\n',
        choices: ['True', 'False'],
    });

    return handleAnswer(answers.question_5 == 'True');
}

async function question6() {
    const answers = await inquirer.prompt({
        name: 'question_6',
        type: 'list',
        message:
            'Which of the following is a valid variable declaration in Python?\n',
        choices: ['let sum = 10', 'int sum = 10', 'sum = 10', 'var sum = 10'],
    });

    return handleAnswer(answers.question_6 == 'sum = 10');
}

async function question7() {
    const answers = await inquirer.prompt({
        name: 'question_7',
        type: 'list',
        message:
            'Which of the following is the correct way to use the standard namespace in C++?\n',
        choices: [
            'using namespace std',
            'using standard namespace;',
            'using namespace std;',
            'using namespace standard;',
        ],
    });

    return handleAnswer(answers.question_7 == 'using namespace std;');
}

async function question8() {
    const answers = await inquirer.prompt({
        name: 'question_8',
        type: 'list',
        message:
            'Which of the following is not a primitive type in Javascript?\n',
        choices: [
            'Boolean',
            'Undefined',
            'Object',
            'Null',
        ],
    });

    return handleAnswer(answers.question_8 == 'Object');
}

async function question9() {
    const answers = await inquirer.prompt({
        name: 'question_9',
        type: 'list',
        message:
            'Which computer broke the codes of the German Lorenz SZ-40 cipher machine?\n',
        choices: ['ENIAC', 'Colossus', 'Z3', 'Bombe'],
    });

    return handleAnswer(answers.question_9 == 'Colossus');
}

async function question10() {
    const answers = await inquirer.prompt({
        name: 'question_10',
        type: 'list',
        message: 'Which computer broke Enigma?\n',
        choices: ['ENIAC', 'Colossus', 'Z3', 'Bombe'],
    });

    return handleAnswer(answers.question_10 == 'Bombe');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer.....').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Good work ${playerName}. That's correct. \n` });
    } else {
        spinner.error({
            text: `GAME OVER, You lose ${playerName}.`,
        });
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const message = `Congratulations, ${playerName} ! \n You are a winner !`;

    figlet(message, (err, data) => {
        console.log(gradient.summer.multiline(data));
    });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await question9();
await question10();
await winner();
