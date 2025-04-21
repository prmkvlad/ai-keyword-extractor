import { useState, useRef } from 'react';
import { Container, Box } from '@chakra-ui/react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import Footer from './components/Footer';
import KeywordsDialog from './components/KeywordsDialog';
import { Toaster } from './components/ui/toaster';

import axios from 'axios';

const App = () => {
	const [keywords, setKeywords] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const abortControllerRef = useRef(null);

	const extractKeywords = async (text) => {
		try {
			setLoading(true);
			setIsOpen(true);

			abortControllerRef.current = new AbortController();
			const { signal } = abortControllerRef.current;

			const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

			const messages = [
				{ role: "system", content: "You are an expert in extracting keywords from text." },
				{
					role: "user",
					content: `Extract only the keywords from the following text. 
							Make the first letter of each word uppercase and separate them with commas.
							Do not include anything else, just the keywords.\n\n${text}`
				}
			];


			const result = await axios.post('https://api.mistral.ai/v1/chat/completions', {
				model: 'mistral-large-latest',
				messages: messages,
			}, {
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json',
				},
				signal,
			});

			const response = result.data.choices[0].message.content;

			setKeywords(response || 'No response found');
		} catch (error) {
			if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
				console.log("The request was canceled.");
			} else {
				console.error('Error:', error);
			}
		} finally {
			setLoading(false);
		}
	};

	const closeDialog = () => {
		setIsOpen(false);

		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
	};

	return (
		<Box height='100vh' paddingTop={130}>
			<Container maxW='3xl' centerContent>
				<Header />
				<TextInput extractKeywords={extractKeywords} />
				<Footer />
			</Container>
			<KeywordsDialog keywords={keywords} loading={loading} open={isOpen} closeDialog={closeDialog} />
			<Toaster />
		</Box>
	);
};

export default App;
