<h1 align="center">Logging Utils for Node.js</h1>

[![Version](https://img.shields.io/badge/Versão-v1.0.3-green.svg)](https://github.com/maucrvlh)

---

:fire: Utilitário para logging com cores

## Instalação usando npm
   
```
$ npm i mm-node-log-utils --save
```

## Instalação usando yarn (ligeiramente mais rápido)
   
```
$ yarn add mm-node-log-utils
```

## Utilização

### Logging da aplicação

```typescript
import * as log from 'mm-node-log-utils';
import settings from '../../config/settings';

const PORT = 8101;

log.setSettings(settings); // configura na lib as settings do sistema
                            // caso não haja esta configuração, a lib lançará um GenericErrorException


log.info(`${settings().system.name} rodando na porta ${PORT}.`);
log.debug('Debug #2 no index.js: ', { a: 1, b: 2 });
log.error('Ocorreu um erro. Objeto retornado: ', { a: 1, b: 2 });
log.log('Usuário acessou o sistema.');
log.success('sucesso na criação da entidade.');

```

### Configurando como plugin de log de requisições no ExpressJS 

```typescript
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as methodOverride from 'method-override';
import * as knex from 'knex';
import * as onHeaders from 'on-headers';
import settings from './settings';
import constants from './constants';
import routes from '../app/routes/all.js';

import * as log from 'mm-node-log-utils';
import { ConsumerNotAllowedException } from 'mm-node-exceptions';

export default function () {
    let app = express();


    log.setSettings(settings());

    app.use(log.plugin);

    
    app.use(bodyParser.urlencoded({ extended: true }));    
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(helmet());
    
    //...

    

    return app;
}

```


## Exceções

#### GenericErrorException
>É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().