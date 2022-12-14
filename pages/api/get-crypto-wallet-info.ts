import { NextApiRequest, NextApiResponse } from 'next';
import { ICryptoWalletInfo, INextApiRequest } from '../../types';

interface IResponseData {
  result: ICryptoWalletInfo[];
}

const CRYPTO_WALLET_INFO: ICryptoWalletInfo[] = [
  {
    name: 'btc',
    address: 'bc1qn843y6qvqpu0tdx33al5e8sjuy66n6a8jv63ch',
    network: 'BTC'
  },
  {
    name: 'eth',
    address: '0xf690cE9449741fe907b9FC4144b4A3762D6C7749',
    network: 'ERC20'
  },
  {
    name: 'theta',
    address: '0xcABd6BA1737F1f4883dfB2f84a0B74927107359F',
    network: 'Theta'
  },
  {
    name: 'ada',
    address: 'addr1q8vngtar5s6h8qz3fgv2a7fa44m4cptxm4l9kxns5e53p5xexsh68fp4wwq9zjsc4munmtthtszkdht7tvd8pfnfzrgqdsfrfr',
    network: 'Cardano'
  },
  {
    name: 'matic',
    address: '0xf690cE9449741fe907b9FC4144b4A3762D6C7749',
    network: 'Polygon'
  },
  {
    name: 'trx',
    address: 'THYa8ATzHb3CzsHfTcYxtS5LVkzvLW3Vxv',
    network: 'Tron (TRC20)'
  },
  {
    name: 'bnb',
    address: '0xf690cE9449741fe907b9FC4144b4A3762D6C7749',
    network: 'BSC (BEP20)'
  },
  {
    name: 'rune',
    address: 'bnb1cs6pxa49mfn3s4jshgun0466hxj5977t2ux730',
    network: 'BNB (BEP2)'
  },
  {
    name: 'ltc',
    address: 'LKRwwJ755894BirdRUmDsoAj9pvRi1LBvQ',
    network: 'Litecoin'
  },
  {
    name: 'sol',
    address: 'Ey4fx8XL9Z4DHEMdLx7yK55ecqCefY66DrmbZjhvrQ3g',
    network: 'Solana'
  },
  {
    name: 'doge',
    address: 'D6hTcB1AFCKPmyNo5dPvaJkyDM371NQt8C',
    network: 'Dogecoin'
  }
];

export default function getCryptoWalletInfo(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
  try {
    res.status(200).json({ result: CRYPTO_WALLET_INFO });
  } catch {
    res.status(500);
  }
};