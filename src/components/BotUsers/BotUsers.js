import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../../reducers/botUsers/actions'

import './styles.css'

class BotUsers extends Component {
  state = {
    currentPage: 1,
    userPerPage: 10,
    search: '',
  }

  componentWillMount() {
    this.props.dispatch(getUsers())
  }

  handleDirectClick = (num) => {
    this.setState({
      currentPage: num
    })
  }

  handlePrevious = () => {
    this.setState(prevState => {
      return {currentPage: prevState.currentPage - 1}
    })
  }

  handleNext = () => {
    this.setState((prevState) => {
      return {currentPage: prevState.currentPage + 1};
    });
  }

  handleSearch(e) {
    this.setState({
      search: e.target.value,
      currentPage: 1
    });
  }

  render() {
    const {botUsers} = this.props
    const {currentPage, userPerPage} = this.state

    let searchedUsers = botUsers.filter((botUser) => {
      return botUser.name.toLowerCase().indexOf(this.state.search) !== -1;
    });

    const pages = () => {
      const pagesCount = searchedUsers.length / userPerPage
      let nArr = []

      for (let i = 0; i < pagesCount; i++) {
        nArr.push(i + 1)
      }
      return nArr
    }

    let currentPageUsers = searchedUsers.slice((currentPage - 1) * userPerPage, (currentPage - 1) * userPerPage + userPerPage)

    return (
      <div>
        <div className='pages'>
          {currentPage > 1 && <button onClick={this.handlePrevious}>Previous</button>}
          {pages().map(pageNum => (
            <button className={currentPage === pageNum ? 'activePage' : null} key={pageNum}
                    onClick={() => this.handleDirectClick(pageNum)}>{pageNum}</button>
          ))}
          {currentPage < botUsers.length / userPerPage && pages().length > 1 &&
          <button onClick={this.handleNext}>Next</button>}
        </div>
        <div className='form-group'>
          <form>
            <input
              type="text"
              placeholder='Search'
              value={this.state.search}
              onChange={this.handleSearch.bind(this)}
            />

          </form>
        </div>
        {searchedUsers.length > 0 ?
          <div className='bot-users'>
            {botUsers && currentPageUsers.map(user => (
              <div key={user.id} className='bot-user'>
                <img src={user.avatarUrl} alt=''/>
                <h4>{user.name}</h4>
              </div>
            ))}
          </div>
          : <h1>no users found</h1>
        }

      </div>
    )
  }
}

const mapStateToProps = state => ({
  botUsers: state.botUsers.botUsers,
})

export default connect(mapStateToProps)(BotUsers)