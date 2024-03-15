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

## Screenshots

### Delivery

| | |
|:-------------------------:|:-------------------------:|
| ![Screenshot 2024-03-15 at 2 14 50 PM](https://github.com/mukulrajpoot262610/instapayments/assets/73209159/b48041b3-eeb3-4754-a3c0-b5daa269bace) | ![Screenshot 2024-03-15 at 2 14 59 PM](https://github.com/mukulrajpoot262610/instapayments/assets/73209159/72cdf272-fce8-4bd4-8115-44232b184630) |

### Payment
|||
|:-------------------------:|:-------------------------:|
| ![Screenshot 2024-03-15 at 2 15 04 PM](https://github.com/mukulrajpoot262610/instapayments/assets/73209159/30368700-50a3-4a67-b2ff-c9138709f56a) | ![Screenshot 2024-03-15 at 2 15 12 PM](https://github.com/mukulrajpoot262610/instapayments/assets/73209159/50c89d92-9d7c-4315-a75a-36a79c132d4e)
| ![Screenshot 2024-03-15 at 2 15 17 PM](https://github.com/mukulrajpoot262610/instapayments/assets/73209159/bc30a7bf-4eda-483b-a614-86861c090dd2) | ![Screenshot 2024-03-15 at 2 15 20 PM](https://github.com/mukulrajpoot262610/instapayments/assets/73209159/43606ac6-9899-4add-9e3c-d25ce1583c76)
| ![Screenshot 2024-03-15 at 2 15 25 PM](https://github.com/mukulrajpoot262610/instapayments/assets/73209159/b6237cbe-10f4-4475-bced-78fb62ebafb2) | ![Screenshot 2024-03-15 at 2 15 29 PM](https://github.com/mukulrajpoot262610/instapayments/assets/73209159/cdb12324-8b79-4b16-a22c-66a43caa9ab2)
 
### Order Complete
|||
|:-------------------------:|:-------------------------:|
| ![Screenshot 2024-03-15 at 2 23 44 PM](https://github.com/mukulrajpoot262610/instapayments/assets/73209159/67b90d16-0fd4-40aa-b55c-bf91a6868f9f) | ![Screenshot 2024-03-15 at 2 15 47 PM](https://github.com/mukulrajpoot262610/instapayments/assets/73209159/deec4d48-242d-43f5-aa69-d94429d7d886)


## Deployment

Project is deployed on Vercel. Open <a href="https://instapayments-mukul.vercel.app">**https://instapayments-mukul.vercel.app**</a> with your browser to see the result.
