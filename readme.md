# chat-room-server-and-p2p

This project is from a workshop at [prishtina hackerspace][1]
where we built a websocket chat room and then replaced the server with direct
p2p connections.

You can look at the websocket version by checking out or inspecting the files
from 5e48c7bfbc01230ec6f57da63d968a312456327f:

```
$ git show 5e48c7bfbc01230ec6f57da63d968a312456327f:browser.js
$ git show 5e48c7bfbc01230ec6f57da63d968a312456327f:server.js
```

or you can check this version out as a new branch:

```
$ git checkout -b websocket 5e48c7bfbc01230ec6f57da63d968a312456327f
```

and the webrtc commits are in bfeeb625bca69f1da328d07a555238f1cd2f6515 (HEAD):

```
$ git show bfeeb625bca69f1da328d07a555238f1cd2f6515:browser.js
$ git show bfeeb625bca69f1da328d07a555238f1cd2f6515:server.js
```

or you can check this version out as a new branch:

```
$ git checkout -b webrtc bfeeb625bca69f1da328d07a555238f1cd2f6515
```

[1]: http://www.prishtinahackerspace.org/
