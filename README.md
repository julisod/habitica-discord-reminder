## Background

Habitica is a gamified habit tracker, which I mostly use on my PC. Habitica doesn’t support reminders in-browser, so I’ve been using a Discord bot to send me daily reminders. But that created the problem of having to first go to Discord to mark the message as read and to then go to Habitica to check of the daily. What if that could be done in one step instead? Or maybe I just wanted an excuse to learn how to make a Discord bot in Typescript.

## Features

There’s a json file with all of the dailies that need a reminder, with the time that the reminder should be scheduled for. At the scheduled time the program first sends an API request to Habitica to figure out if the task is completed yet. If it hasn’t, it sends a reminder to Discord. When the user clicks the button, it sends out another request to Habitica to mark the daily as done.

## Future development

Right now all of the tasks are in a json file where I have to add them manually in the correct format, but I would love to have a slash command on Discord that can add new reminders, as well as a command that lets me edit them.
