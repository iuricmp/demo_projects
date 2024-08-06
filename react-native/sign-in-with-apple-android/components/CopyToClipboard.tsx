import { TouchableOpacity } from "react-native"
import * as Clipboard from 'expo-clipboard';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
	text: string | undefined | null,
	children: React.ReactNode
}

const CopyToClipboard: React.FC<Props> = ({ text, children }) => {

	const onPress = async () => {
		if (text)
			await Clipboard.setStringAsync(text)
	}

	return (
		<TouchableOpacity onPress={onPress}>
			{children}
			{text ?<Ionicons name="copy" size={16} /> : null}
		</TouchableOpacity>
	)
}

export default CopyToClipboard
