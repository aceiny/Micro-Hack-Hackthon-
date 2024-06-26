## Cloning

```bash
$ git clone https://github.com/aceiny/Micro-Hack-Hackthon-.git
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Api docs

```bash
https://lionfish-app-5ggjo.ondigitalocean.app/api
```

## Database schema

```bash
https://dbdiagram.io/d/662b115d03593b6b6101dbf8
```

## Features
1. **Create Organization and Add Workers:** Facilitate team collaboration by creating organizations and adding workers.
2. **Upload Documents in a Compressed Way:** Save storage space by uploading documents in a compressed format.
3. **Get and Download Documents:** Retrieve and download stored documents easily.
4. **Manage Document Roles and Access:** Define roles and access permissions for secure document management.
5. **Manage Document Versions:** Keep track of document versions and changes over time.
6. **AI-Powered File Search:** Utilize AI to search for files based on content descriptions, such as finding images by describing their contents.
7. **Read PDF Files Using AI:** Extract text from PDF files for easy access and searchability.
8. **Talk About the Document with AI:** Interact with AI to discuss and analyze document content.
9. **Use Redis Cache to Speed Up the Process:** Improve performance by caching frequently accessed data.

## Usage
- Create organizations and add workers.
- Upload documents in a compressed format.
- Manage document roles and access permissions.
- Utilize AI services for document analysis and file searching.
- Download and manage document versions.

## AI Services
- **Audio to Text:** Convert audio files to text.
- **Chat Bot:** Engage in discussions about document content.
- **Describe Image:** Provide descriptions of image content.
- **PDF to Text:** Extract text from PDF files.
- **Document Summary:** Generate summaries of documents.

## SECURITY MEASURES
- **Strong authentication:** using Passport.js and guards to control access based on authentication
- **Encryption:** Encrypting and hashing passwords 
- **Vulnerability Prevention::** Leverage security features built into NestJS like Helmet, which helps configure secure HTTP headers to mitigate common attacks.
- **Input Validation:** Validate all user-provided data to prevent unexpected inputs or malicious code injection
- **Rate Limiting:**  Implement rate limiting to prevent brute-force attacks or denial-of-service attempts.

## BLOCKCHAIN
#### Create Organization and Add Workers:
##### Store organization details like name, creation date, and regulatory compliance certificates on the blockchain. 

#### Get and Download Documents:
##### Secure Download with Proof-of-Access: Grant access to authorized users by providing them with a cryptographic key or digital signature

#### Manage Document Roles and Access:

##### Define roles and permissions for document access on the blockchain

#### Manage Document Versions:

##### Store document version hashes along with timestamps on the blockchain.


## Technologies Used
- TypeScript
- Node.js
- Nest.js
- Mongodb
- Multer
- Redis
- AI Services (Audio to Text, Chat Bot, Describe Image, PDF to Text, Document Summary)
- JWT
- Jest
- Form-Data
## Contributors
- ahmed yassine zeraibi
- yzeraibi2000@gmail.com