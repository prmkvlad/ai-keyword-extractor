import React from 'react'
import { Text, Button, Dialog, Spinner } from '@chakra-ui/react'

const KeywordsDialog = ({ keywords, loading, open, closeDialog }) => {
	return (
		<>
			<Dialog.Root open={open} onOpenChange={(e) => closeDialog(e.open)}>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							Extracted keywords
						</Dialog.Header>
						<Dialog.Body display='flex' alignItems='center' justifyContent='center'>
							{loading ? (
								<Spinner isIndeterminate color='blue.300' />
							) : (
								<Text>
									{keywords}
								</Text>
							)}
						</Dialog.Body>
						<Dialog.Footer>
							<Button colorScheme='blue' mr={3} onClick={closeDialog}>Close</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>


		</>
	)
}

export default KeywordsDialog