# Window 0
ganache-cli --gasPrice 0 -k berlin

# Window 1
cd packages/protocol
truffle migrate
node
# -> script-inshell.js