import * as _ from 'lodash'
import {useMemo} from "react";

export const usePagination = ({totalCount, pageSize, siblingCount = 1, currentPage}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        const totalPageNumbers = siblingCount + 5; //siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const DOTS = '...';

        /*
          Case 1:
          Выводим все номера страниц
        */
        if (totalPageNumbers >= totalPageCount) {
            return _.range(1, totalPageCount+1);
        } else {

            /*
               Находим левых и правых соседей
           */
            const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
            const rightSiblingIndex = Math.min(
                currentPage + siblingCount,
                totalPageCount
            );

            /*
              Смотрим необходимо ли выводить левые и правые многоточия
            */
            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

            const firstPageIndex = 1;
            const lastPageIndex = totalPageCount;

            /*
                Case 2: Только правые многоточия
            */
            if (!shouldShowLeftDots && shouldShowRightDots) {
                let leftItemCount = 3 + 2 * siblingCount;
                let leftRange = _.range(1, leftItemCount+1);

                return [...leftRange, DOTS, totalPageCount];
            }

            /*
                Case 3: Только левые многоточия
            */
            if (shouldShowLeftDots && !shouldShowRightDots) {

                let rightItemCount = 3 + 2 * siblingCount;
                let rightRange = _.range(
                    totalPageCount - rightItemCount + 1,
                    totalPageCount+1
                );
                return [firstPageIndex, DOTS, ...rightRange];
            }

            /*
                Case 4: И левые и правые многоточия
            */
            if (shouldShowLeftDots && shouldShowRightDots) {
                let middleRange = _.range(leftSiblingIndex, rightSiblingIndex+1);
                return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
            }
        }

    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};