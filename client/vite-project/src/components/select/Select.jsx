import styles from './Select.module.scss';
import { CATEGORIES } from '../../utils/genres';
import useCustomSelect from '../../hooks/useCustomSelect';
import { FaCheckSquare } from "react-icons/fa";

const Select = ({ category }) => {

    const {
        dropdownToggleHandler,
        isDropdownOpen,
        choice,
        updateChoice
    } = useCustomSelect();

    return (
        <>
            <div
                onClick={dropdownToggleHandler}
                className={styles.custom__select__container}
            >
                <p
                    className={styles.custom__select__choice__text}
                >   
                    {/* on EditQuote page we need to preload the category depending on data store in db, so I am passing category from that component. if no category is passed we display choice state */}
                    {category ? category : choice}
                </p>

                {isDropdownOpen
                    ?
                    <span
                        className={styles.custom__select__choice__text__down__arrow}
                    >
                    </span>
                    :
                    <span
                        className={styles.custom__select__choice__text__up__arrow}
                    >
                    </span>}
            </div>

            <div
                className={
                    `${styles.custom__select__options__list__wrapper} 
                    ${isDropdownOpen ? styles.open : ''}`
                }
                onClick={(e) => updateChoice(e)}
            >
                {CATEGORIES.map(c =>
                    <div
                        key={c.value}
                        className={styles.custom__select__option__container}
                    >
                        <p
                            className={styles.custom__select__option}
                        >
                            {c.name}
                        </p>

                        {choice === c.name
                            ?
                            <span
                                className={styles.custom__select__react__icon__container}
                            >
                                <FaCheckSquare
                                    className={styles.custom__select__react__icon}
                                />
                            </span>
                            : ''}

                    </div>
                )
                }

            </div>
        </>
    )
}

export default Select;

