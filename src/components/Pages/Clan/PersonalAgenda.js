import React from 'react';

class PersonalAgenda extends React.Component {
    render () {
        const agenda = [
            {
                img: '/img/dummy/Rectangle2.png',
                title: 'Morning Routine',
                subtitle: 'Current: Exercise for 10 min...',
                time: '7 AM',
            },
            {
                img: '/img/dummy/Rectangle1.png',
                title: 'Healthy Spirits!',
                subtitle: 'Current: Run 10 KM',
                time: 'Jan 18',
            },
            {
                img: '/img/dummy/Rectangle3.png',
                title: 'Workout',
                subtitle: 'Current: Chest Day',
                time: 'Jan 18',
            }
        ]
        return (
            <div className="bg-white_color px-6 py-3 rounded-xl shadow-vici mt-6">
                <div className="flex justify-between border-b pb-2 border-vici_gray">
                    <div className="font-bold">Personal Agenda - <span className="italic">Today</span></div>
                    <button>
                        <img src="/img/ph_kanban-light.png" />
                    </button>
                </div>
                {
                   agenda.map((item, i) => (
                        <div className="flex justify-between my-3" key={i}>
                            <div className="w-full flex justify-between">
                                <div className="flex">
                                    <div>
                                        <img alt="" src={item.img} className="w-10 rounded-lg"></img>
                                    </div>
                                    <div className="pt-1 pl-3">
                                        <div className="font-bold">{ item.title }</div>
                                        <div className="text-xs">{item.subtitle}</div>
                                    </div>
                                </div>
                                <div className="pt-3">
                                    <span className="text-xs">{item.time}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }   
                <div className="flex justify-center">
                    <button className="font-bold text-vici_secondary">View all</button>
                </div>       
            </div>
        )
    }
}
export default PersonalAgenda