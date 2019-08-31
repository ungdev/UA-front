import React from 'react';
import { Tournament } from '../../components';
import text from '../../assets/text.json';

const Ssbu = () => (
  <Tournament
    bgImg="https://img.bfmtv.com/c/1256/708/88a/c71b34349143f15d3bc2ed1e4745e.jpeg"
    logo="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9af4c12f-a0d9-48ab-a9d3-240148699eaf/dcefz8t-ad4f550f-1890-419a-bf24-d2488bbed08c.png/v1/fill/w_1024,h_552,strp/_logo_super_smash_bros__ultimate_logo_in_hq__by_rapbattleeditor0510_dcefz8t-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTUyIiwicGF0aCI6IlwvZlwvOWFmNGMxMmYtYTBkOS00OGFiLWE5ZDMtMjQwMTQ4Njk5ZWFmXC9kY2Vmejh0LWFkNGY1NTBmLTE4OTAtNDE5YS1iZjI0LWQyNDg4YmJlZDA4Yy5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.9YHabnQS9YJBoh-Jx5pC4bnJ2z13KH7W8xVvOkwtZ4Q"
    text={text.ssbu}
    reglement="https://backoffice.gamers-assembly.net/sites/default/files/tournament/OES-2019%20-%20R%C3%A8glement%20-%20League%20of%20Legends.pdf"
    dataSource={[]}
  />
);

export default Ssbu;