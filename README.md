# Archer-FS
Written by **Parker Cranfield**  
Started **Nov 5, 2021**

## Why did I start this project?
For the longest time I was annoyed at the hardship it took to transfer my personal files from one computer to the next
with USBs being tedious to use, Google Drive and other social media platforms being either too slow, not allowing
large files, or websites making me pay for storage in the cloud. So I took matters into my own hands.

## What is the design idea?
In short terms, I want ***Archer File Server*** to be a lightweight, portable file server, that I could clone onto any
machine and within minutes be able to personally upload/download my files from machine to machine anywhere in the world,
without the hassle of paying money, not having "enough space", or having to bring hardware with me (ex. USB).

## Plans for this project?
Well for now I just want it to be functional, having a bear bones app that I can access and toy with in my free time.
In the future I hope for it to look good, be more secure (as I still know very little JS) and maybe add features,
ex. Subdirectories, Search by name, adding users, deleting users (as root), allowing certain files to be accessed by
certain users, etc.

## How to use?
Currently this is ***in development*** so please use at your own risk, Until I release a stable release I ***highly suggest*** you dont
make this web-facing. But if you want to clone and play around, feel free!
Installation instructions: (current Version of node is ***v16.12.0***)
1. Clone Repo
2. Inside **Archer-FS** make a "data" folder (this is where your files will be stored)
3. go into libs/index.js and scroll down to the login function, and change the allowed username and password to your preference
4. Run through Nodejs (remember to install required dependancies, see the top of index.js for a list of them)
5. Go to localhost:3000

<!-- https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax -->
