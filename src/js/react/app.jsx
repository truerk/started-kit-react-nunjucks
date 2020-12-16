import React from 'react'
import classes from './index.module.scss'
import Select from '@ui/Select'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        const customSelect = new Select('[am-select="cities"]', {
            name: 'city',
            placeholderOption: 'The list of cities is empty',
            placeholder: 'Choice city',
            placeholderSearch: 'City not found',
            options: [
                {value: 'custom', label: 'Custom city'},
            ]
            // search: true
        })

        customSelect.on('change', data => {
            console.log(data);
        })
    }

    render() {

        return (
            <div className={classes.app}>
                <div am-container="">
                    <a style={{marginTop: '25px', marginBottom: '25px',color: 'blue'}} href="/store.html">go to store page</a>
                </div>
                <div am-container="">
                    <form am-form="news">
                        <div am-form-field={''} width={100}>
                            <div am-input="fio">
                                <div am-hint="top">fio</div>
                                <div am-input-group={''}>
                                    <div am-check={''} />
                                    <input name="fio" type="text" placeholder="fio" autoComplete="off" />
                                </div>
                            </div>
                            <div am-input="name" error={''}>
                                <div am-hint="top">Name <span am-required={''}>*</span></div>
                                <div am-input-group={''}>
                                    <div am-check={''} />
                                    <input name="name" type="text" placeholder="name" autoComplete="off" />
                                </div>
                            </div>
                            <div am-input="patronymic" accept={''}>
                                <div am-hint="top">Patronymic</div>
                                <div am-input-group={''}>
                                    <div am-check={''} />
                                    <input name="patronymic" type="text" placeholder="patronymic" autoComplete="off" />
                                </div>
                            </div>
                        </div>
                        <div am-form-field={''} width="auto">
                            <div am-input="phone">
                                <div am-hint="top">Phone <span am-required={''}>*</span></div>
                                <div am-input-group={''}>
                                    <div am-check={''} />
                                    <input name="phone" placeholder="+7 (900) 000-0000" type="text" autoComplete="off" />
                                </div>
                            </div>
                            <div am-input="email">
                                <div am-hint="top">Email</div>
                                <div am-input-group={''}>
                                    <div am-check={''} />
                                    <input name="email" type="text" placeholder={''} autoComplete="off" />
                                </div>
                            </div>
                        </div>
                        <div am-form-field={''} width="auto">
                            <div am-select={'cities'} am-input="city">
                                <input am-select-input={''} type="hidden" name="city" defaultValue={0} />
                                <div am-select-value={''}>Your city</div>
                                <div am-select-wrapper={''}>
                                    <div am-select-options={''}>
                                        <div am-select-option={0}>All cities</div>
                                        <div am-select-option={1}>New York</div>
                                        <div am-select-option={2}>Moscow</div>
                                        <div am-select-option={3}>Tolyatti</div>
                                        <div am-select-option={4}>Los Angeles</div>
                                        <div am-select-option={5}>Chicago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div am-form-field={''}>
                            <div am-checkbox={''}>
                                <input am-checkbox-input={''} name="subscribe" type="checkbox" />
                                <div am-checkbox-wrapper={''}>
                                    <div am-checkbox-icon={''} />
                                    <div am-checkbox-label={''}>Subscribe to news</div>
                                </div>
                            </div>
                        </div>
                        <div am-form-field={''}>
                            <button am-button="main" type="submit">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default App