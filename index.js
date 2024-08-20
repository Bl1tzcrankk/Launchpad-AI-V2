class AsyncExtension {
    getInfo() {
        return {
            id: 'launchpadai',
            name: 'Launchpad AI',
            color1: '#d40f30',
            color2: '#8f0b21',
            color3: '#d40f30',
            blocks: [
                {
                    opcode: 'fetch',
                    text: 'Ask AI [PROMPT]',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {
                        PROMPT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hi!'
                        }
                    }
                },
                {
                    opcode: 'fetchwm',
                    text: 'Ask [MODEL] [PROMPT]',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {
                        PROMPT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hi!'
                        },
                        MODEL: {
                            type: Scratch.ArgumentType.STRING,
                            menu: "MODEL_MENU"
                        }
                    }
                }
            ],
            menus: {
                MODEL_MENU: {
                    acceptReporters: true,
                    items: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo']
                }
            }
        };
    }

    fetch(args) {
        return fetch("https://launchpad-ai-v2.onrender.com/?prompt=" + args.PROMPT)
            .then((response) => {
                return response.text();
            })
            .catch((error) => {
                console.error(error);
                return 'Uh oh! Something went wrong.';
            });
    }

    fetchwm(args) {
        return fetch(`https://launchpad-ai-v2.onrender.com/wm?model=${args.MODEL}&prompt=${args.PROMPT}`)
            .then((response) => {
                return response.text();
            })
            .catch((error) => {
                console.error(error);
                return 'Uh oh! Something went wrong.';
            });
    }
}
Scratch.extensions.register(new AsyncExtension());
