import React, { useEffect, useState } from 'react';
import { Form, Grid, Label, Table, Icon, Message } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

function Main(props) {
  const { api } = useSubstrate();
  const [blockInfo, setBlockInfo] = useState();
  const [blockhash, setBlockhash] = useState();

  const getBlockHashInfo = async (blockhash) => {
    try {
      const blockInfo = await api.rpc.chain.getHeader(blockhash);
      setBlockInfo(blockInfo);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Grid.Column>
    <h1>Search block by hash</h1>
      <Form
        onSubmit={async (e, { value }) => await getBlockHashInfo(blockhash)}
        size='medium'
      >
        <Form.Group widths={10}>
          <Form.Input
            size='large'
            width={10}
            placeholder={'Search By Block Hash'}
            onChange={(e, { value }) => setBlockhash(value)}
          />
          <Form.Button content="Search" />
        </Form.Group>
      </Form>
      {blockInfo && blockInfo.number && (
        <Table celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell> Block </Table.Cell>
              <Table.Cell>{blockInfo.number.toNumber()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ParentHash</Table.Cell>
              <Table.Cell>{blockInfo.parentHash.toHuman()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>State Root</Table.Cell>
              <Table.Cell>{blockInfo.stateRoot.toHuman()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Extrinsics Root</Table.Cell>
              <Table.Cell>{blockInfo.extrinsicsRoot.toHuman()}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </Grid.Column>
  );
}

export default function BlockSearch(props) {
  const { api } = useSubstrate();
  return api.rpc && api.rpc.chain.getHeader ? <Main {...props} /> : null;
}