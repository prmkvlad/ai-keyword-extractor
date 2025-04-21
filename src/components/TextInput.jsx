import { useState } from 'react';
import { Textarea, Button } from '@chakra-ui/react';
import { toaster } from './ui/toaster';

function TextInput({ extractKeywords }) {
	const [text, setText] = useState('');

	const submitText = () => {
		if (text === '') {
			toaster.create({
				title: 'Text field is empty',
				description: 'Please enter some text to extract keywords',
				type: 'error',
				duration: 5000,
				isClosable: false,
			});
		} else {
			extractKeywords(text);
		}
	};

	return (
		<>
			<Textarea
				padding={4}
				marginTop={6}
				height={200}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>

			<Button
				marginTop={4}
				width='100%'
				_hover={{ bg: 'blue.700' }}
				onClick={submitText}
			>
				Extract Keywords
			</Button>
		</>
	)
}

export default TextInput