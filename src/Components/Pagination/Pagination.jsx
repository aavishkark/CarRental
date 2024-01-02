import {Button,ButtonGroup,Center,HStack} from '@chakra-ui/react'
function Pagination(props) {
  return (
    <Center data-testid="pagination-component">
      <HStack>
      <ButtonGroup gap='4'>
      {Array.from({ length: props.pages }, (_, index) => (
          <Button key={index} onClick={()=>props.func(index+1)}>
            {index + 1}
          </Button>
        ))}
      </ButtonGroup>
      </HStack>
    </Center>
  );
}

export default Pagination;
