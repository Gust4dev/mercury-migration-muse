/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Seu código de verificação Mercury Nexus</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={card}>
          <Text style={brand}>MERCURY NEXUS</Text>
          <Heading style={h1}>Confirme sua identidade</Heading>
          <Text style={text}>Use o código abaixo para confirmar sua identidade:</Text>
          <Text style={codeStyle}>{token}</Text>
          <Text style={footer}>
            Este código expira em breve. Se você não solicitou esta verificação, ignore este e-mail.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', margin: 0, padding: '40px 0' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '0 20px' }
const card = { backgroundColor: '#0a0a0a', borderRadius: '16px', padding: '40px 32px', border: '1px solid #1f1f1f' }
const brand = { fontSize: '12px', letterSpacing: '3px', color: '#FFD700', fontWeight: 'bold' as const, margin: '0 0 24px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#ffffff', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#cccccc', lineHeight: '1.6', margin: '0 0 20px' }
const codeStyle = { fontFamily: 'Courier, monospace', fontSize: '28px', letterSpacing: '6px', fontWeight: 'bold' as const, color: '#FFD700', backgroundColor: '#1a1a1a', padding: '16px 24px', borderRadius: '10px', textAlign: 'center' as const, margin: '0 0 24px' }
const footer = { fontSize: '12px', color: '#777777', margin: '30px 0 0', lineHeight: '1.5' }
