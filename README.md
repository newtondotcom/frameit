# FrameIt

I want to sell a new product :
It is a eink display in a frame so it is low power and can be displayed all the time.
It exist 3,5 and 7 inches versions, both in black and white and color. Comes in with a usb c connector and a battery.

It can serves multiple features :
- display pictures from a gallery, using API to automate ?
- allow elderly to see their family pictures in a slideshow
- display original messages from family / boyfriend / girlfriend
- show the date, weather, calender
We can think about a lot of other features, that can be implemted later such as music control of spotify.

The buyer can manage what is printed through a web interface.
He can upload pictures, write messages, and schedule everything.
He can manages multiple devices from one account.

The display is connected with a raspberry pi zero which will periodically fetch the data from a dedicated api route. Datas transitiing should be encrypted with keys to make sure that if the id of the device is stolen, the data is not, remaining cofindential.
I think the best way is to fetch the data to display under the form of a picture, fetched every minute or someting like that

For the landing page, make something modern but attractive.
I have 3d files for every components, I want to make every component apperaing when sliding down and assemble them at the bottom of the section.
Include a Product Launch Waitlist form section to collect emails and notify them when the product is ready to be sold.

I want to include an other page where people can preorder it, using lemon squeezy for payment.


Use tailwind css, shadcn, only ts files, prisma, and create required api routes.
Can u try to use Aceternity UI and Magic UI library components ? suich as bento grid or hero Video dialog.
Can you also create the dashboard that will be protected with authentification, where the user can manage his devices and the data displayed on them. I will be using nextAuth with OAuth providers.
In the dahsbpard, allow users to see orders, current owned devices, and manage them. they can ask for account deletion etc.

## Technology

What is the best solution for managing the fleet ? Following the principles :
- to reduce rasberry power consumption
- to ensure a scalable solution on server side, we could use a third package coded in an other language

I think about two solutions :
- raspberry pi zero which will periodically fetch the data from a dedicated api route. Datas transitiing should be encrypted with keys to make sure that if the id of the device is stolen, the data is not, remaining cofindential.
I think the best way is to fetch the data to display under the form of a picture, fetched every minute or someting like that
- raspberry pi zero will use GRPC. This way they could be called by the server. However, if a user has scheduled a change in content, how to store all the grpc triggers that need to be called at a precise time ?


## Pull requests

1. Use server actions instead of  api since all routes will be used from inside the app, to ensure that the user is authenticated and authorized to access the data.
