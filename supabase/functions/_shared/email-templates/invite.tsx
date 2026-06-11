/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({ siteUrl, confirmationUrl }: InviteEmailProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Você foi convidado para a Mercury Nexus</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={card}>
          <Text style={brand}>MERCURY NEXUS</Text>
          <Heading style={h1}>Você foi convidado</Heading>
          <Text style={text}>
            Você recebeu um convite para entrar na{' '}
            <Link href={siteUrl} style={link}>
              <strong>Mercury Nexus</strong>
            </Link>
            . Clique no botão abaixo para aceitar o convite e criar sua conta.
          </Text>
          <Button style={button} href={confirmationUrl}>
            Aceitar convite
          </Button>
          <Text style={footer}>
            Se você não esperava este convite, pode ignorar este e-mail com segurança.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', margin: 0, padding: '40px 0' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '0 20px' }
const card = { backgroundColor: '#0a0a0a', borderRadius: '16px', padding: '40px 32px', border: '1px solid #1f1f1f' }
const brand = { fontSize: '12px', letterSpacing: '3px', color: '#FFD700', fontWeight: 'bold' as const, margin: '0 0 24px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#ffffff', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#cccccc', lineHeight: '1.6', margin: '0 0 20px' }
const link = { color: '#FFD700', textDecoration: 'none' }
const button = { backgroundColor: '#FFD700', color: '#0a0a0a', fontSize: '15px', fontWeight: 'bold' as const, borderRadius: '10px', padding: '14px 28px', textDecoration: 'none', display: 'inline-block', margin: '8px 0 24px' }
const footer = { fontSize: '12px', color: '#777777', margin: '30px 0 0', lineHeight: '1.5' }
