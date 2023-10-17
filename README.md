# "Becha-Kena" - An Ecommerce Platform
"Becha-Kena" is a responsive modern "Full Stack" ecommerce application with Payments functionality and P2P communication feature between buyer and seller. Recognising the barriers with individual merchants and startups against big giants' monopoly systems. I realised to build a platform where a buyer or seller can communicate or burgain on their products which facilities are not given by other usual e-commerce platforms.

## Tech Stack
**Client:**  React Js, Redux 

**Server:**  Django, Django Reast Framework, Django Channels, Celery , WEBRTC, Razorpay

# Features and Functionalities
- User Registration , Login , Logout , OTP Verification through Mail 
- Product Searching , Filtering , Sorting 
- Text Chats , Image Share , Video Conference-call between buyer and seller using django channels and WEBRTC
- Add to Cart
- Razorpay payment system
- Notifications and Email using celery
- Order canceling and Order Tracking


# Interface

<h4>Filtering Products Video .....</h4>

<video width="500" height="300" src="https://github.com/nuruzz9134/Becha-Kena/assets/120547305/2d19474c-ee70-4b53-96de-d6d2b6ba1902"></video>

<h4>Items adding and deleting from Cart.....</h4>

<video width="500" height="300" src="https://github.com/nuruzz9134/Becha-Kena/assets/120547305/53f67724-de0f-4092-a99b-c3a5c3768096"></video>

<h4>video-Chat beteen customer and seller.....</h4>

<video width="500" height="300" src="https://github.com/nuruzz9134/Becha-Kena/assets/120547305/cfef3ff6-a1c1-41a2-9af5-f0e71decd741"></video>

<h4>Razorpay payment getway...</h4>
<img src="https://github.com/nuruzz9134/Becha-Kena/assets/120547305/257a755d-6fc0-413a-a919-843adb7db935" alt="Razorpay payment"/>

# Deployment
To run the project to your local machine, follows the steps.... 
## frontend-settings....
Before installing and using the Yarn package manager, you will need to have Node.js installed. To see if you already have Node.js installed, type the following command into your local command line terminal:

```bash
  node -v
```
install yarn package manager
```bash
  yarn install
```
to start yarn
```bash
  cd Becha-Kena
  cd client
  yarn start
```
Other dependencies are...
```bash
  yarn add react@^18.2.0
  yarn add react-redux@^8.1.2
  yarn add @reduxjs/toolkit@^1.9.5
  yarn add axios@^1.5.0
  yarn add react-icons@^4.8.0
  yarn add react-player@^2.13.0
  yarn add react-razorpay@^2.0.1
```


## backend-settings....
All dependencies are...
```bash
  pip install Django==4.1.6
  pip install djangorestframework==3.14.0
  pip install djangorestframework-simplejwt==5.2.2
  pip install channels==4.0.0
  python -m pip install -U 'channels[daphne]==4.0.0'
  pip install django-cors-headers==3.13.0
  pip install channels-redis==4.1.0
  pip install celery==5.2.7
  pip install django-celery-beat==2.5.0
  pip install django-celery-results==2.5.0
```
