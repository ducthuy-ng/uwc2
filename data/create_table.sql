create table trolley
(
    id          serial primary key,
    license_num varchar(20) unique,
    capacity    integer not null,
    check ( capacity > 0 )
);

create table vehicle
(
    id       serial primary key,
    capacity integer not null,
    check ( capacity > 0 )
);

create type employee_role as enum ('JA', 'CO', 'BO');

create table employee
(
    id           serial primary key,
    full_name    varchar(50) not null,
    username     varchar(50) not null,
    password     varchar(50) not null,
    working_role employee_role
);

create table area
(
    id   serial primary key,
    name varchar(15) not null
);

create table mcp
(
    id          serial primary key,
    max_cap     integer not null,
    check ( max_cap > 0 ),
    current_cap integer default 0,
    check ( current_cap >= 0 )
);

------------------------------------------------------------------------------------

create table trolley_assignment
(
    trolley_id integer references trolley (id),
    ja_id      integer references employee (id)
);

create index trolley_assignment_index on trolley_assignment (trolley_id, ja_id);


create table area_assignment
(
    area_id    integer references area (id),
    vehicle_id integer references vehicle (id)
);

create index area_assignment_index on area_assignment (area_id, vehicle_id);

------------------------------------------------------------------------------------

create type days_of_week as enum ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');


create table ja_base_calendar
(
    mcp_id      integer references mcp (id),
    day_of_week days_of_week,
    ja_id       integer references employee (id),
    primary key (mcp_id, day_of_week)
);
-- create index ja_base_calendar_index on ja_base_calendar (mcp_id, ja_id);

create table co_base_calendar
(
    area_id     integer references area (id),
    day_of_week days_of_week,
    co_id       integer references employee (id),
    primary key (area_id, day_of_week)
);

-- create index co_base_calendar_index on co_base_calendar (mcp_id, ja_id);

------------------------------------------------------------------------------------


create table ja_calendar
(
    mcp_id    integer references mcp (id),
    work_date date,
    ja_id     integer references employee (id),
    primary key (mcp_id, work_date)
);
-- create index ja_calendar_index on ja_calendar (mcp_id, ja_id);

create table co_calendar
(
    area_id   integer references area (id),
    work_date date,
    co_id     integer references employee (id),
    primary key (area_id, work_date)
);

-- create index co_calendar_index on co_calendar (mcp_id, ja_id);