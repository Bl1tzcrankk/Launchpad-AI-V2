class AsyncExtension {
    getInfo() {
      return {
        id: 'launchpadai',
        name: 'Launchpad AI',
        color1: '#ff0000', // pure red
        color2: '#00ff00', // pure green
        color3: '#0000ff',
        blocks: [
          {
            opcode: 'fetch',
            text: 'Ask AI [URL]',
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hi!'
              }
            }
          }
        ]
      };
    }
  
    fetch (args) {
      return fetch("https://improved-journey-rqjg7jwppv4c5rg5-7000.app.github.dev/?prompt=" + args.URL)
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