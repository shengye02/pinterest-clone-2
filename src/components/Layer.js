import React from 'react'

function Layer() {
    return (
        <div className="layer">
        <div className="pin__boards__menu">
          <div className="pin__boards__menu left">
            <div className="pin__boards__menuDetails">
              <h1>Boards</h1>
              <KeyboardArrowDownIcon onClick={onClick} />
            </div>
            {clickOpen ? (
              <div className="pin__dropdown">
                <div className="pin__dropdown__search">
                  <div className="pin__dropdown__searchContainer">
                    <SearchIcon />
                    <form>
                      <input
                        placeholder="Search"
                        type="text"
                        onChange={(e) => console.log(e)}
                      />
                    </form>
                  </div>
                </div>
                <div className="pin__dropdown__createBoard">
                  <AddCircleIcon onClick={openModal} />
                  <p> Create board</p>
                </div>
              </div>
            ) : null}
          </div>
          <div className="pin__boards__menu right">
            <div className="pin__boards__menuDetails">
              <h1>Save</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="pin__text__container">
        <p>{description}</p>
      </div>
      </div>
    )
}

export default Layer
