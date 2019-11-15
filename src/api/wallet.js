import axios from 'axios'

export default {
  // 读取提现微信账户
  readWxAccount: () =>
    axios.get('/appapi.php?c=Merchantapp&a=money_withdraw_info', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 充值记录
  topupRecord: page =>
    axios.get('/appapi.php?c=Merchantapp&a=money_merrecharge_list', {
      params: {
        page,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 提现记录
  withdrawRecord: page =>
    axios.get('/appapi.php?c=Merchantapp&a=money_withdraw_records', {
      params: {
        page,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 收支记录
  incomeAndExpenditureRecord: page =>
    axios.get('/appapi.php?c=Merchantapp&a=money_income_list', {
      params: {
        page,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
