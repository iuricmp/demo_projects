import { Image, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AppleSinginButton, { AppleAuthenticationCredential } from '@/components/button/AppleSinginButton';
import { useState } from 'react';
import CopyToClipboard from '@/components/CopyToClipboard';

export default function HomeScreen() {

	const [credentials, setCredentials] = useState<AppleAuthenticationCredential | undefined>(undefined);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<Image
					source={require('@/assets/images/partial-react-logo.png')}
					style={styles.reactLogo}
				/>
			}>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Welcome!</ThemedText>
				<HelloWave />
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Step 1: Sign In with Apple</ThemedText>
				<AppleSinginButton onSignedIn={(credential) => {
					console.log(credential);
					setCredentials(credential);
				}} />
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Step 2: Get your token</ThemedText>
				<CopyToClipboard text={credentials?.authorizationCode}>
					<ThemedText type="defaultSemiBold">Authorization Code: </ThemedText>
					<ThemedText>
						{credentials ? credentials.authorizationCode : ''}
					</ThemedText>
				</CopyToClipboard>
				<CopyToClipboard text={credentials?.email}>
					<ThemedText type="defaultSemiBold">email: </ThemedText>
					<ThemedText>
						{credentials ? credentials.email : ''}
					</ThemedText>
				</CopyToClipboard>
				<CopyToClipboard text={credentials?.identityToken}>
					<ThemedText type="defaultSemiBold">identity Token: </ThemedText>
					<ThemedText>
						{credentials ? credentials.identityToken : ''}
					</ThemedText>
				</CopyToClipboard>
				<CopyToClipboard text={credentials?.user}>
					<ThemedText type="defaultSemiBold">user: </ThemedText>
					<ThemedText>
						{credentials ? credentials.user : ''}
					</ThemedText>
				</CopyToClipboard>
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
});
