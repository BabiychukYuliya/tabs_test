import React from "react";
import { Table } from "./dummy.styled";
import { Cell } from "./dummy.styled";

const DummyTable = () => {
  return (
    <main>
      <Table>
        <tbody>
          <tr>
            <Cell>Dummy</Cell>
            <Cell>Table</Cell>
            <Cell>First</Cell>
          </tr>
          <tr>
            <Cell>Dummy</Cell>
            <Cell>Table</Cell>
            <Cell>Second</Cell>
          </tr>
          <tr>
            <Cell>Dummy</Cell>
            <Cell>Table</Cell>
            <Cell>Third</Cell>
          </tr>
        </tbody>
      </Table>
    </main>
  );
};

export default DummyTable;
