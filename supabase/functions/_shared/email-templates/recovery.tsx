/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({ confirmationUrl }: RecoveryEmailProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Redefina sua senha na Mercury Nexus</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={card}>
          <Text style={brand}>MERCURY NEXUS</Text>
          <Heading style={h1}>Redefina sua senha</Heading>
          <Text style={text}>
            Recebemos um pedido para redefinir a senha da sua conta. Clique no botão abaixo para escolher uma nova senha.
          </Text>
          <Button style={button} href={confirmationUrl}>
            Redefinir senha
          </Button>
          <Text style={footer}>
            Se você não solicitou a redefinição, pode ignorar este e-mail — sua senha permanecerá a mesma.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', margin: 0, padding: '40px 0' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '0 20px' }
const card = { backgroundColor: '#0a0a0a', borderRadius: '16px', padding: '40px 32px', border: '1px solid #1f1f1f' }
const brand = { fontSize: '12px', letterSpacing: '3px', color: '#FFD700', fontWeight: 'bold' as const, margin: '0 0 24px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#ffffff', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#cccccc', lineHeight: '1.6', margin: '0 0 20px' }
const button = { backgroundColor: '#FFD700', color: '#0a0a0a', fontSize: '15px', fontWeight: 'bold' as const, borderRadius: '10px', padding: '14px 28px', textDecoration: 'none', display: 'inline-block', margin: '8px 0 24px' }
const footer = { fontSize: '12px', color: '#777777', margin: '30px 0 0', lineHeight: '1.5' }
