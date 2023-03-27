# Projet calculatrice

Ce projet est une application Node.js qui permet de calculer des expressions mathématiques à partir d'une chaîne de caractères. On y accède via front en HTML/CSS/JS natif et il fonctionne grâce à un backend fait en Node.js.

## Installation

Importer le fichier puis lancer la commande : 

```js 
npm install 
```

## Usage

```js
const evaluate = require('./utils');

console.log(evaluate.customEval("12 + 2"))
```

## Lancement 

```js 
npm start 
```

Pour le front, il suffit d'aller dans le navigateur à l'url suivante : `http://localhost:3000/`


## Lancement des tests unitaires

```js 
npm test 
//ou
mocha 
```

## Visuels

![image](https://user-images.githubusercontent.com/81032503/228032415-9b5ed2c7-5d67-4d1b-9cd0-98a899b463a1.png)

![image](https://user-images.githubusercontent.com/81032503/228032623-d38d1a60-2449-495b-96cd-975f86a945b7.png)


