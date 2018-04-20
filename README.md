<h1 align="center">TJAM Logging Utils for Node.js</h1>

[![Version](https://img.shields.io/badge/Versão-v1.0.0-green.svg)](http://git.tjam.jus.br/local-node-modules/)

---

:fire: Utilitário para logging com cores

## Instalação usando npm
   
```
$ npm i http://git.tjam.jus.br/local-node-modules/tjam-node-log-utils.git#v1.0.0 --save
```

## Instalação usando yarn (ligeiramente mais rápido)
   
```
$ yarn add http://git.tjam.jus.br/local-node-modules/tjam-node-log-utils.git#v1.0.0
```

## Utilização
```typescript
import * as log from 'tjam-node-log-utils';
import settings from '../../config/settings';

log.setSettings(setttings); // configura na lib as settings do sistema
                            // caso não haja esta configuração, a lib lançará um GenericErrorException

log.debug('texto da mensagem para debug com objeto', { a: 1, b: 'x', c: ['www','localost'] });
log.log('texto de log normal');
log.error('texto de log de um erro');
log.info('texto de log de uma informação');
log.success('texto de log de sucesso na ação\n\n\n');

```

## Resultado

![Console](http://git.tjam.jus.br/local-node-modules/tjam-node-log-utils/raw/master/log.png "console")


## Exceções

#### GenericErrorException
>É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().