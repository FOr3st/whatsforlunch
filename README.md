# whatsforlunch

## Idea
An application that helps to decide what can you prepare for lunch!

## User story
As a User I would like to view an app in a web browser that will display a list of recipes that I can prepare
for lunch today based on the contents of my fridge, so that I can quickly decide what I’ll be having to eat
and the ingredients required to prepare the meal.

## The​ ​Input
There are two JSON feeds, one of which is a list of the available ingredients, and another one is a list of cooking recipes.

### Ingredients:
http://www.mocky.io/v2/5cb016f83100006c00e131b0

```
{
  "ingredients": [
    { "title": "Ham", "best-before": "2019-04-22", "use-by": "2019-04-27" },
    { "title": "Cheese", "best-before": "2019-04-22", "use-by": "2019-04-27" },
    { "title": "Bread", "best-before": "2019-04-22", "use-by": "2019-04-27" },
    { "title": "Butter", "best-before": "2019-04-22", "use-by": "2019-04-27" },
    ...
  ]
}
```

### Recipes:
http://www.mocky.io/v2/5c85f7a1340000e50f89bd6c

```
{
  "recipes": [
    {
      "title": "Ham and Cheese Toastie",
      "ingredients": ["Ham", "Cheese", "Bread", "Butter"]
    },
    {
      "title": "Hotdog",
      "ingredients": ["Hotdog Bun", "Sausage", "Ketchup", "Mustard"]
    },
    {
      "title": "Omelette",
      "ingredients": ["Eggs", "Mushrooms", "Milk", "Salt", "Pepper", "Spinach"]
    },
    ...
  ]
}
```

## The​ ​Output
Afther clicking on "What's for lunch?" button the output should display list of recipes that I can prepare
for lunch today based on the contents of my fridge

Sample​ ​Output:
```
Ham and Cheese Toastie
What you'll need:
- Ham
- Cheese
- Bread
- Butter

Hotdog
What you'll need:
- Hotdog Bun
- Sausage
- Ketchup
- Mustard
```

## Starting up
To start, run: `npm i`, `npm start`.