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

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ confirmationUrl }: MagicLinkEmailProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Seu link de acesso à Mercury Nexus</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={card}>
          <Text style={brand}>MERCURY NEXUS</Text>
          <Heading style={h1}>Seu link de acesso</Heading>
          <Text style={text}>
            Clique no botão abaixo para entrar na sua conta. Este link expira em breve.
          </Text>
          <Button style={button} href={confirmationUrl}>
            Entrar agora
          </Button>
          <Text style={footer}>
            Se você não solicitou este link, pode ignorar este e-mail com segurança.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', margin: 0, padding: '40px 0' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '0 20px' }
const card = { backgroundColor: '#0a0a0a', borderRadius: '16px', padding: '40px 32px', border: '1px solid #1f1f1f' }
const brand = { fontSize: '12px', letterSpacing: '3px', color: '#FFD700', fontWeight: 'bold' as const, margin: '0 0 24px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#ffffff', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#cccccc', lineHeight: '1.6', margin: '0 0 20px' }
const button = { backgroundColor: '#FFD700', color: '#0a0a0a', fontSize: '15px', fontWeight: 'bold' as const, borderRadius: '10px', padding: '14px 28px', textDecoration: 'none', display: 'inline-block', margin: '8px 0 24px' }
const footer = { fontSize: '12px', color: '#777777', margin: '30px 0 0', lineHeight: '1.5' }
