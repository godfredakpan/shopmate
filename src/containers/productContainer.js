import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'

import theme from '../theme'
import ItemCard from '../components/itemCard'
import FilterBox from '../components/filterBox'
import ButtonComp from '../components/button'
import { withRouter } from 'next/router'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  }
}

class ProductContainer extends Component {

  state = {
    skip: 2,
    limit: 10,
    param: null
  }

  componentDidMount() {
    this.checkParam()
  }

  checkParam() {
    const { query } = this.props.router
    if (query.catId) {
      this.setState({param: {name: 'inCategory', id: query.catId} })
    } else if (query.depId) {
      this.setState({param: {name: 'inDepartment', id: query.deptId} })
    } else {
      this.setState({param: {name:'null'}})
    }
    console.log(this.props);
  }

  render() {
    const { classes, products, searchMessage, categories, departments, getMoreProducts } = this.props

    const { skip, limit, param } = this.state
    console.log(this.state)
    return (
      <div style={{ width: '100%' }}>
        <div className={classes.container}>
          <Hidden only={['xl', 'sm', 'xs']} implementation="css">
            <div className={classes.content}>
              <FilterBox
                productCount={products ? products.count : 0}
                categories={categories}
                departments={departments}
              />
            </div>
          </Hidden>
          <div
            style={{
              position: 'absolute',
              marginLeft: '35%',
              marginTop: '-2rem'
            }}
          >
            {products && products.count > 0 ? searchMessage : 'no result'}
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              margin: 'auto',
              marginTop: 0
            }}
          >
            {products &&
              products.rows.slice(0, 6).map((item, i) => (
                <div style={{ display: 'flex' }} key={item.product_id}>
                  <ItemCard
                    style={{ marginRight: '2rem', marginBottom: '2rem' }}
                    title={item.name}
                    image={item.thumbnail}
                    id={item.product_id}
                  />
                </div>
              ))}
          </div>
        </div>
        <Hidden only={['xl', 'sm']} implementation="css">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around'
            }}
          >
            {products &&
              products.rows.slice(6).map((item, i) => (
                <div
                  style={{ display: 'flex', margin: '2rem' }}
                  key={item.product_id}
                >
                  <ItemCard
                    box={1}
                    title={item.name}
                    image={item.thumbnail}
                    id={item.product_id}
                  />
                </div>
              ))}
          </div>
        </Hidden>
        <div style={{display:'flex', justifyContent:'center', margin:'1rem'}}>
        <ButtonComp button={1} fontSize='1rem' width='fit-content' onClick={() => {
          getMoreProducts(param, skip, limit)
          this.setState({skip:skip+1})
        }
      } text='Load More'/>
      </div>
      </div>
    )
  }

}

export default withRouter(withStyles(styles)(ProductContainer))
