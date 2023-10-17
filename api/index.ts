import { Request, Response } from "express";
import {CableType} from '../shared/types';

const express = require("express");
const cors = require("cors");
const data = require("./data");

const app = express();
const port = 5174;

app.use(cors());
app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});
app.get("/cable/type", (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 0;
  const after = Number(req.query.after) || 0;
  const searchValue = req.query.searchValue || '';
  const filtered = data.entities.filter((item: CableType) => 
    item.catid.toString().includes(searchValue as string) ||
    item.manufacturer.name.toLocaleLowerCase().includes(searchValue as string)
  );
  const sliced = filtered.slice(after, after + limit);
  const response = {
    ...data, 
    entities: sliced, 
    total: filtered.length
  }

  if (filtered.length < after) {
    const [decimal, fract] = (filtered.length / limit).toString().split('.');

    response.entities = filtered.slice(-fract);
  }

  res.json(response);
});

app.listen(port, () => {
  console.log(`api listening on port ${port}`);
});
