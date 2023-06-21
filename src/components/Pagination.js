import React from 'react';
import {usePagination} from "../utils/usePagination";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { clsx } from 'clsx'

export const Pagination = ({onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, lastPage}) => {
    const paginationRange = usePagination({currentPage, totalCount, siblingCount, pageSize});
    // Если меньше 2х страниц, то пагинацию не показываем
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }
    let firstPage = 1
    const onNext = () => {
            onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
            onPageChange(currentPage - 1);
    };

    return (
          <nav aria-label="Page navigation example" className='flex place-content-center mt-5'>
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <button onClick={onPrevious}
                   className="block px-3 py-2 ml-0 w-14 leading-tight text-xl text-white rounded-l-lg bg-dark-gray border
                   border-gray hover:bg-gray hover:text-white" disabled={firstPage>currentPage-1}>
                  <span className="sr-only">Previous</span>
                  <MdKeyboardArrowLeft/>
                </button>
              </li>

              {paginationRange?.map((el,i)=>{
                return <li key={i}>
                  <button onClick={() => onPageChange(el)} disabled={typeof el === 'string'}
                    className={clsx('px-3 py-2 w-14 leading-tight text-white bg-dark-gray border border-gray hover:bg-gray hover:text-white',
                      el===currentPage && 'bg-dark-green')}>{el}</button>
                </li>
              })}
              <li>
                <button onClick={onNext}
                   className='block px-3 py-2 w-14 leading-tight text-xl rounded-r-lg text-white bg-dark-gray border border-gray
                   hover:bg-gray hover:text-white' disabled={lastPage<currentPage+1} >
                  <span className="sr-only">Next</span>
                  <MdKeyboardArrowRight/>
                </button>
              </li>
            </ul>
          </nav>
    );
};