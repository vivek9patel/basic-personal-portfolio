# Personal portfolio with basic design

This is a [Next.js](https://nextjs.org/) portfolio styled with [Tailwind CSS](https://tailwindcss.com/).

## Getting Started

### Install the packages:

```bash
npm i
# or
yarn
```

### To make the contact form work

- Create a account in [emailjs](https://www.emailjs.com/) create also new Outlook or Gmail account to be able
  to send email.
- Create a new service, select and log in to your newly created outlook or gmail account on EmailJS.
- Go back to the dashboard and get the Service ID copy it.
- Create a .env file in your root folder

```
NEXT_PUBLIC_USER_ID = 'YOUR_USER_ID'
NEXT_PUBLIC_TEMPLATE_ID = 'template_fqqqb9g'
NEXT_PUBLIC_SERVICE_ID = 'YOUR_SERVICE_ID'
```

Replace your user id and service ID with values in your EmailJS service.

### Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### To open video conferencing application

- Create a account in [100ms](https://100ms.live/).
- Log in to your newly created dashboard and go to developer settings.
- Checkout to _video-call_ branch.
- Copy and paste below keys into your .env file.

```
HMS_TEMPLATE_NAME = <template name>
HMS_TOKEN_ENDPOINT = <endpoint url>
HMS_ACCESS_KEY = <access key>
HMS_SECRET = <secret key>
```

<a href="https://www.buymeacoffee.com/vivek9patel" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 140px !important;" ></a>

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributiors who wants to make this website better can make contribution,which will be **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Added some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
