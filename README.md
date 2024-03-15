<h1 align="center" id="title">InstaPayments</h1>

<p align="center"><img src="https://socialify.git.ci/mukulrajpoot262610/instapayments/image?description=1&amp;descriptionEditable=A%20user-friendly%2C%20and%20RESPONSIVE%20checkout%20experience.%20&amp;font=Inter&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Circuit%20Board&amp;theme=Dark" alt="project-image"></p>

<p id="description">A user-friendly and RESPONSIVE checkout experience.</p>

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repo</p>

```
git clone https://github.com/mukulrajpoot262610/instapayments.git
```

<p>2. Install necessary dependencies</p>

```
npm install
```

<p>3. Add Environment Variables</p>

```
cp .env.example .env.local
```

<p>4. Run the Dev Server</p>

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<h2>How to get env variables</h2>

- Go to Cashfree Payments and generate test id `NEXT_PUBLIC_CF_CLIENT_ID`, secret key `NEXT_PUBLIC_CF_SECRET_KEY` and base url `NEXT_PUBLIC_CF_BASE_ENDPOINT`.

  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Next.js
*   Tailwind
*   Shadcn UI
*   Cashfree Payments
*   Vercel

<h2>Data for Testing</h2>

### UPI VPA ( Virtual Payment Address )

- `testsuccess@gocash` for Success Simulation 
- `testfailure@gocash` for Failure Simulation

### UPI QR 

- Scan QR code and simulate accordingly.

### CARDS

| Name        | Card Number       | Expiry Date | CVV/CVC | Scheme      |
| ----------- | ----------------- | ----------- | ------- | ----------- |
| Mukul       | 4706131211212123  | 03/28       | 123     | Visa        |
| Mukul       | 5409162669381034  | 03/28       | 123     | Master Card |
| Mukul       | 6074825972083818  | 03/28       | 123     | RuPay       |


## Deployment

Project is deployed on Vercel. Open <a href="https://instapayments-mukul.vercel.app">**https://instapayments-mukul.vercel.app**</a> with your browser to see the result.
