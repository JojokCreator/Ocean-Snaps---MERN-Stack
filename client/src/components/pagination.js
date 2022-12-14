import { Pagination, PaginationItem } from '@mui/material/'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/posts';
import useStyles from './styles'

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const { classes } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination classes={{ul: classes.ul}} count={numberOfPages} page={Number(page)} variant="outlined" color="primary" 
        renderItem={(item) => (
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
        )}
    />
  )
}

export default Paginate