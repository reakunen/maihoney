import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from '@react-email/components'
import * as React from 'react'

interface KoalaWelcomeEmailProps {
	name: string
	// quantity: number
	// address: string
	// order_number: number
	// order_date: string
	receipt_url: string
}

const baseUrl = process.env.NEXT_PUBLIC_URL
	? `https://${process.env.NEXT_PUBLIC_URL}`
	: ''

export const KoalaWelcomeEmail = ({
	name,
	// quantity,
	// address,
	// order_number,
	receipt_url,
}: KoalaWelcomeEmailProps) => (
	<Html>
		<Head />
		<Preview>Maihoney Email Receipt</Preview>
		<Body style={main}>
			<Container style={container}>
				<Img
					src={`${baseUrl}/email/maihoney.png`}
					width="170"
					height="50"
					alt="maihoney"
					style={logo}
				/>
				<Text style={paragraph}>Hi {name},</Text>
				<Text style={paragraph}>
					Thank you for your purchase at maihoney! Your honey will be on its way
					soon and should arrive within 5-7 business days. Enjoy the sweetness!
				</Text>
				<Text style={paragraph}>
					If you have any questions or concerns please email contact@maihoney.com
				</Text>
				<Section style={btnContainer}>
					<Button style={button} href={receipt_url}>
						Your Receipt
					</Button>
				</Section>
				<Text style={paragraph}>
					Best,
					<br />
					Brian &amp; Chris
				</Text>
				<Hr style={hr} />
				<Text style={footer}>San Lorenzo CA, 94580</Text>
			</Container>
		</Body>
	</Html>
)

export default KoalaWelcomeEmail

const main = {
	backgroundColor: '#ffffff',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
	margin: '0 auto',
	padding: '20px 0 48px',
}

const logo = {
	margin: '0 auto',
}

const paragraph = {
	fontSize: '16px',
	lineHeight: '26px',
}

const btnContainer = {
	textAlign: 'center' as const,
}

const button = {
	backgroundColor: '#fcd34d',
	borderRadius: '3px',
	color: '#fff',
	fontSize: '16px',
	textDecoration: 'none',
	textAlign: 'center' as const,
	display: 'block',
	padding: '12px',
}

const hr = {
	borderColor: '#cccccc',
	margin: '20px 0',
}

const footer = {
	color: '#8898aa',
	fontSize: '12px',
}
